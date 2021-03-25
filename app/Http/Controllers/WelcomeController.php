<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Album;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('welcome');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $album = Album::where('slug', $slug)->first();

        if ($album)
        {
            return view('welcome');
        }
        else
        {
            return abort(404);
        }
    }
}
