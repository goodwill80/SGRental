<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => [
                'id' => $this->category->id,
                'name' =>$this->category->name
            ],
            'room_category' => [
                'id' => $this->roomCategory->id,
                'name' => $this->roomCategory->name
            ],
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'price' => $this->price,
            'thumbnail' => $this->thumbnail,
            'description' => $this->description,
            'ratings' => $this->ratings,
            'created' => $this->created_at->toDateTimeString()
        ];
    }
}
