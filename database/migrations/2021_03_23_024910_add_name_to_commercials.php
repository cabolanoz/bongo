<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNameToCommercials extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('commercials', function (Blueprint $table) {
            $table->after('id', function($table) {
                $table->string('name', 100)->default('');
            });
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('commercials', function (Blueprint $table) {
            $table->dropColumn('name');
        });
    }
}
