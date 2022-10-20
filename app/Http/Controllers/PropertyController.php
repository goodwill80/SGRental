<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use App\Http\Resources\PropertyResource;
use App\Http\Requests\StorePropertyRequest;

class PropertyController extends Controller
{
    // 1. SHOW ALL PROPERTIES BASED ON SEARCH QUERY
    public function index(Request $request) 
    {

        $order_direction = $request->input('order_direction', 'desc');

        if(!in_array($order_direction, ['asc', 'desc']) | $order_direction == '') {
            $order_direction = 'desc';
        }

        $filterables = ['name', 'description'];

        $properties = Property::with('category')
            ->when($request->filled('global'), function($query) use($filterables, $request) {
                foreach($filterables as $column) {
                    if($column == $filterables[0]) {
                        $query->where($column, 'like', '%' . $request->global . '%');
                    } else {
                        $query->orWhere($column, 'like', '%' . $request->global . '%');
                    }
                }
            })
            ->when($request->filled('category_id'), function($query) use($request){
                $query->where('category_id', $request->category_id);
            })
            ->when($request->filled('room_category_id'), function($query) use($request) {
                $query->where('room_category_id', $request->room_category_id);
            })
            ->orderBy('created_at', $order_direction)
            ->paginate(10);


        return PropertyResource::collection($properties); 
    }

    // 1a. SHOW ALL PROPERTIES WITHOUT PAGINATION
    public function all() 
    {
        return PropertyResource::collection(Property::all()); 
    }    

    // 1b. SHOWS SPECIFIC CATEGORY PROPERTIES
    public function category(Request $request) {
        $properties = Property::all()->where('category_id', $request->categoryid);
        return PropertyResource::collection($properties);
    }

    // 2. SHOW SINGLE PROPERTY
    public function show(Property $id) 
    {   $property = $id;
        if($property->ratings == null ) {
            $property->ratings = 0;
        }
        return new PropertyResource($id);
    }

    // 3. CREATE NEW PROPERTY
    public function store (StorePropertyRequest $request) 
    {
        $data_received = $request->validated();

        if($request->hasFile('thumbnail')) {
            $data_received['thumbnail'] = $request->file('thumbnail')->store('images', 'public');
        }

        $property = Property::create($data_received);
        return new PropertyResource($property);
    }

    // 4. UPDATE PROPERTY
    public function update(StorePropertyRequest $request, Property $property) {
        $data_received = $request->validated();
        if($request->hasFile('thumbnail')) {
            $data_received['thumbnail'] = $request->file('thumbnail')->store('images', 'public');
            if(strpos($property->thumbnail, "images") !== false) {
                $image_to_remove = dirname(public_path()) . '/storage/app/public/' . $property->thumbnail;
                unlink($image_to_remove);
            }
        }
        $property->update($data_received);
        return new PropertyResource($property);
    }

    // 5. DELETE PROPERTY
    public function destroy(Property $property) 
    {
        if(strpos($property->thumbnail, "images") !== false) {
            $image_to_remove = dirname(public_path()) . '/storage/app/public/' . $property->thumbnail;
            unlink($image_to_remove);
        }
        $property->delete();
        return response()->noContent();    
    }

    // 6. SHOW ONLY LISTING CREATED BY SPECIFIC USER
    public function userProps (Request $request ) 
    {
        $properties = Property::all()->where('user_id', $request->userid);
        return PropertyResource::collection($properties);
    }

    // 7. LIKE A PROPERTY
    public function like(Request $request, Property $property)
    {
        $property->like($request->userid);
        return ([
            "message" => "1 count of like has been added to " . $property->name,
            "current_total_likes" => $property->likeCount
        ]);
    }

    // 8.  UNLIKE A PROPERTY
    public function unlike (Request $request, Property $property) 
    {
        $property->unlike($request->userid);
        return ([
            "message" => $property->name . " has been unlike",
            "current_total_likes" => $property->likeCount
        ]);
    }

    // 9. GET COUNT OF LIKES
    public function likescount (Property $property)
    {
        return ([
            "count" => $property->likeCount,
            "property_name" => $property->name
        ]);
    }

    // 10. RETRIEVE LIKES INFO OF A PROPERTY
    public function likesinfo (Property $property) 
    {
        return $property->likes;
    }

    public function checklike (Property $property, Request $request)
    {
        return $property->liked($request->userid);
    }



}
