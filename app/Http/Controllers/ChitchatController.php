<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ChitchatCollection;
use App\Http\Resources\ChitchatResource;
use App\Models\Chitchat;

class ChitchatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $chitchats = Chitchat::published()->take(15);

        return new ChitchatCollection($chitchats);
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
        $chitchat = Chitchat::where('slug', $slug)->first();

        return new ChitchatResource($chitchat);
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
     * Display a listing of prominent chitchats
     *
     * @return \Illuminate\Http\Response
     */
    public function prominents(Request $request)
    {
        $chitchats = Chitchat::prominent()->take(3);

        return new ChitchatCollection($chitchats);
    }

    /**
     * Search all type of chitchats.
     * 
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $search = $request->query('search');

        $chitchats = Promenade::where('title', 'LIKE', '%' . $search . '%')->published();

        return new PromenadeCollection($chitchats);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function exists($slug)
    {
        $chitchat = Chitchat::where('slug', $slug)->published()->first();

        if ($chitchat)
        {
            return view('welcome');
        }
        else
        {
            return abort(404);
        }
    }
}
