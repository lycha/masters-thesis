CREATE OR REPLACE VIEW lead_customer AS
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
    JOIN subproducts ON (leads.subproduct_id = subproducts.id);

CREATE OR REPLACE VIEW utm_source_medium AS 
	SELECT leads.utm_source, leads.utm_medium 
	FROM leads GROUP BY leads.utm_source, leads.utm_medium ORDER BY leads.utm_source

SELECT
	  date::date,
	  coalesce(generic,0) AS generic,
	  coalesce(facebook,0) AS facebook,
	  coalesce(offline,0) AS offline,
	  coalesce(press,0) AS press,
	  coalesce(twitter,0) AS twitter,
	  coalesce(website,0) AS website
	FROM
	 generate_series(
	   '2016-05-12'::timestamp,
	   '2016-05-13'::timestamp,
	   '1 day') AS date
	LEFT OUTER JOIN
	  (SELECT
	     date_trunc('day', created_at) as day,
	     sum(case when utm_source  = 'generic' then 1 else 0 end) as generic,
	     sum(case when utm_source  = 'facebook' then 1 else 0 end) as facebook,
	     sum(case when utm_source  = 'offline' then 1 else 0 end) as offline,
	     sum(case when utm_source  = 'press' then 1 else 0 end) as press,
	     sum(case when utm_source  = 'twitter' then 1 else 0 end) as twitter,
	     sum(case when utm_source  = 'website' then 1 else 0 end) as website
	   FROM leads WHERE dsfsdf
	
	     GROUP BY day) results
	ON (date = results.day)


SELECT leads.utm_source, leads.utm_medium FROM leads GROUP BY leads.utm_source, leads.utm_medium