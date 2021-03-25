<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Spectacle;

class SpectacleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new SpectacleCollection(Spectacle::published());
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
    public function show($slug)
    {
        return new SpectacleResource(Spectacle::published()->where('slug', $slug)->first());
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
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function promenade($slug)
    {
        $spectacle = Spectacle::published()->promenade()->where('slug', $slug)->first();

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
        $spectacle = Spectacle::published()->chitchat()->where('slug', $slug)->first();

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
