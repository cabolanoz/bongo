<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\SpectacleCollection;
use App\Http\Resources\SpectacleResource;
use App\Models\Spectacle;

class SpectacleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $type = $request->query('type');

        $spectacles = Spectacle::where('type', $type)
                               ->published()
                               ->take(15);

        return new SpectacleCollection($spectacles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $slug)
    {
        $type = $request->query('type');

        $spectacle = Spectacle::where('type', $type)
                              ->where('slug', $slug)
                              ->published()
                              ->first();

        return new SpectacleResource($spectacle);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Display a listing of prominent spectacles
     *
     * @return \Illuminate\Http\Response
     */
    public function prominents(Request $request)
    {
        $type = $request->query('type');
        $spectacles = Spectacle::where('type', $type)
                               ->prominent()
                               ->take(3);

        return new SpectacleCollection($spectacles);
    }

    /**
     * Search all type of spectacles.
     * 
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $search = $request->query('search');
        $type = $request->query('type');

        $spectacles = Spectacle::where('title', 'LIKE', '%' . $search . '%');

        if ($type)
        {
            $spectacles = $spectacles->where('type', $type);
        }

        $spectacles = $spectacles->published();

        return new SpectacleCollection($spectacles);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function promenade($slug)
    {
        $spectacle = Spectacle::where('type', 'promenade')
                              ->where('slug', $slug)
                              ->published()
                              ->first();

        if ($spectacle)
        {
            return view('welcome');
        }
        else
        {
            return abort(404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function chitchat($slug)
    {
        $spectacle = Spectacle::where('type', 'chitchat')
                              ->where('slug', $slug)
                              ->published()
                              ->first();

        if ($spectacle)
        {
            return view('welcome');
        }
        else
        {
            return abort(404);
        }
    }
}
