<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SpectacleResource extends JsonResource
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
            'title' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'author' => $this->author,
            'desktop_asset' => $this->desktop_asset,
            'mobile_asset' => $this->mobile_asset,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'type' => $this->type,
            'published' => $this->published,
        ];
    }
}
