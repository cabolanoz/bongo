<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChitchatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'author' => $this->author,
            'desktop_asset' => $this->desktop_asset,
            'mobile_asset' => $this->mobile_asset,
            'start_date' => $this->published_date,
            'category' => $this->category,
            'prominent' => $this->prominent,
            'published' => $this->published,
            'type' => $this->type
        ];
    }
}
