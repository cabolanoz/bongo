<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpectaclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spectacles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->nullable();
            $table->text('description');
            $table->string('author');
            $table->string('desktop_asset');
            $table->string('mobile_asset')->nullable();
            $table->dateTimeTz('start_date', $precision = 0);
            $table->dateTimeTz('end_date', $precision = 0)->nullable();
            $table->enum('type', ['promenade', 'chitchat']);
            $table->foreignId('category_id')->constrained();
            $table->boolean('published')->default(false);
            $table->unsignedBigInteger('created_by');
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
        Schema::dropIfExists('spectacles');
    }
}
