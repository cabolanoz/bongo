<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommercialResource extends JsonResource
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
            'desktop_picture' => $this->desktop_picture,
            'mobile_picture' => $this->mobile_picture,
            'picture_url' => $this->picture_url,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
