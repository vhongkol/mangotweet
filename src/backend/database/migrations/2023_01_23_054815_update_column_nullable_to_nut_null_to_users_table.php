<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->unsigned()->nullable()->change();
            $table->string('last_name')->unsigned()->nullable()->change();
            $table->string('username')->unsigned()->nullable()->change();
            $table->string('photo')->unsigned()->nullable()->change();
            $table->string('about')->unsigned()->nullable()->change();
            $table->string('address')->unsigned()->nullable()->change();           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->unsigned()->nullable(false)->change();
            $table->string('last_name')->unsigned()->nullable(false)->change();
            $table->string('username')->unsigned()->nullable(false)->change();
            $table->string('photo')->unsigned()->nullable(false)->change();
            $table->string('about')->unsigned()->nullable(false)->change();
            $table->string('address')->unsigned()->nullable(false)->change();         
        });
    }
};
