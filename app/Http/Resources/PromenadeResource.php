<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PromenadeResource extends JsonResource
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
            'author' => $this->host,
            'desktop_asset' => $this->desktop_asset,
            'mobile_asset' => $this->mobile_asset,
            'start_date' => $this->event_date,
            'event_time' => $this->event_time,
            'location_name' => $this->location_name,
            // 'location' => $this->location,
            'category' => $this->category,
            'prominent' => $this->prominent,
            'published' => $this->published,
            'type' => $this->type
        ];
    }
}
