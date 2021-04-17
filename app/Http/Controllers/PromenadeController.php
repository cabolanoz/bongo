<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\PromenadeCollection;
use App\Http\Resources\PromenadeResource;
use App\Models\Promenade;

class PromenadeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $promenades = Promenade::published()->take(15);

        return new PromenadeCollection($promenades);
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
        $promenade = Promenade::where('slug', $slug)->first();

        return new PromenadeResource($promenade);
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
     * Display a listing of prominent promenades
     *
     * @return \Illuminate\Http\Response
     */
    public function prominents(Request $request)
    {
        $promenades = Promenade::prominent()->take(3);

        return new PromenadeCollection($promenades);
    }

    /**
     * Search all type of promenades.
     * 
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $search = $request->query('search');

        $promenades = Promenade::where('title', 'LIKE', '%' . $search . '%')->published();

        return new PromenadeCollection($promenades);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function exists($slug)
    {
        $promenade = Promenade::where('slug', $slug)->published()->first();

        if ($promenade)
        {
            return view('welcome');
        }
        else
        {
            return abort(404);
        }
    }
}
