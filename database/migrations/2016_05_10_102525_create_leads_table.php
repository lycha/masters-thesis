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
            $table->string('expa_name');
            $table->integer('expa_id');
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
            $table->integer('lead_id');
            $table->foreign('lead_id')
                  ->references('id')->on('leads')
                  ->onDelete('cascade');
            $table->string('email')->unique();
            $table->passthru('hstore', 'fields');
            $table->timestamps();
        });

        DB::statement('CREATE OR REPLACE VIEW lead_customer AS
            SELECT customers.id AS customer_id, 
                customers.email, 
                customers.fields, 
                customers.created_at AS customer_created_at, 
                customers.lead_id, 
                leads.utm_source,
                leads.utm_campaign_id,
                campaigns.slug AS campain_slug,
                leads.utm_medium,
                leads.utm_content,
                leads.utm_term,
                leads.entity_id,
                entities.slug AS entity_slug,
                leads.product_id,
                products.slug AS product_slug,
                leads.subproduct_id,
                subproducts.slug AS subproduct_slug,
                leads.created_at AS lead_created_at
                FROM customers 
                JOIN leads ON (customers.lead_id = leads.id)
                JOIN campaigns ON (campaigns.id = leads.utm_campaign_id)
                JOIN entities ON (leads.entity_id = entities.id)
                JOIN products ON (leads.product_id = products.id)
                LEFT OUTER JOIN subproducts ON (leads.subproduct_id = subproducts.id);');

        DB::statement('CREATE OR REPLACE VIEW utm_source_medium AS 
            SELECT leads.utm_source, leads.utm_medium 
                FROM leads 
                GROUP BY leads.utm_source, leads.utm_medium 
                ORDER BY leads.utm_source;');


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW lead_customer');
        DB::statement('DROP VIEW utm_source_medium');
        Schema::drop('customers');
        Schema::drop('leads');
        Schema::drop('entities');
        Schema::drop('campaigns');
        Schema::drop('subproducts');
        Schema::drop('products');
    }
}
