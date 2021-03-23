<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PhotoResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'desktop_asset' => $this->desktop_asset,
            'mobile_asset' => $this->mobile_asset,
            'published' => $this->published,
            'album' => $this->album,
        ];
    }
}
