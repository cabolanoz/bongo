<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProminentToSpectacles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('spectacles', function (Blueprint $table) {
            $table->after('category_id', function($table) {
                $table->boolean('prominent')->default(false);
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
        Schema::table('spectacles', function (Blueprint $table) {
            $table->dropColumn('prominent');
        });
    }
}
