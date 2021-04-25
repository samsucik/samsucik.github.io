---
layout: page-fullwidth
title: Birds
subtitle:
url: birds
icon: fa-crow
show_in_menu: true
show_page_header: false
---
{% for bird in site.data.birds %}
	{%- include birds-section.html bird=bird -%}
{% endfor %}
