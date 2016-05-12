<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaigns', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->string('slug')->unique();
            $table->timestamp('expires_on');
            $table->timestamps();
        });

        Schema::create('entities', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('products', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('subproducts', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('product_id');
            $table->foreign('product_id')
                  ->references('id')->on('products')
                  ->onDelete('cascade');
            $table->string('name');
            $table->string('description');
            $table->string('slug');
            $table->timestamps();
        });
        
        Schema::create('leads', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('utm_source', 250);
            $table->integer('utm_campaign_id');
            $table->foreign('utm_campaign_id')
                  ->references('id')->on('campaigns')
                  ->onDelete('cascade');
            $table->string('utm_medium', 250);
            $table->string('utm_content', 250);
            $table->string('utm_term', 250);
            $table->integer('entity_id');
            $table->foreign('entity_id')
                  ->references('id')->on('entities')
                  ->onDelete('cascade');
            $table->integer('product_id');
            $table->foreign('product_id')
                  ->references('id')->on('products')
                  ->onDelete('cascade');
            $table->integer('subproduct_id')->nullable();
            $table->foreign('subproduct_id')
                  ->references('id')->on('subproducts')
                  ->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('customers', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('lead_id', 50);
            $table->foreign('lead_id')
                  ->references('id')->on('leads')
                  ->onDelete('cascade');
            $table->string('email')->unique();
            $table->passthru('hstore', 'fields');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('leads');
        Schema::drop('entities');
        Schema::drop('campaigns');
        Schema::drop('subproducts');
        Schema::drop('products');
        Schema::drop('customers');
    }
}
