<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromenadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promenades', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->nullable();
            $table->longText('description');
            $table->string('host');
            $table->string('desktop_asset');
            $table->string('mobile_asset')->nullable();
            $table->date('event_date');
            $table->time('event_time');
            $table->string('location_name');
            $table->point('location');
            $table->foreignId('category_id')->constrained();
            $table->boolean('prominent')->default(false);
            $table->boolean('published')->default(false);
            $table->unsignedBigInteger('created_by');
            $table->string('type')->default('promenade');
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promenades');
    }
}
