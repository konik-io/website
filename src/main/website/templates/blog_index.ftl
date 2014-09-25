<#include "header.ftl">

<div id="Blog" class="section">
	<div class="container">
		<div class="row page-header">
		    <div class="col-lg-10">
		      <h1>&lt;B&gt;log</h1>
			</div>
			<div class="col-lg-2">
		      <h1 class="text-right"><a class="fa fa-rss" href="feed.xml"></a></h1>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			<!-- tags -->
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  <div class="">
			    <h4>Post Tags</h4>
					<#assign tag_posts = {}>
					<#list posts as post>
						<#if (post.status == "published" && (post.tags)??)>
							<#list post.tags as tag>
								<#assign tag_posts = tag_posts + {tag:([post] + tag_posts[tag]![] )}>
							</#list>
						</#if>
					</#list>

					<#list tag_posts?keys as key>
					  <div class="btn-group">
						  <button class="btn btn-default btn-sm dropdown-toggle margin" type="button" data-toggle="dropdown">${key} <span class="caret"></span></button>
						  <ul class="dropdown-menu">
						    <#list tag_posts[key] as p>
						    	  <li><a href="#${p.doctitle}">${p.doctitle}</a></li>
						    </#list>
						  </ul>
					  </div><!--btn-group -->
					</#list>
			  </div><!-- /well -->
			</div><!-- col-lg-4 -->



			<#list posts as post>
				<div id="${post.title}" class="col-lg-12 col-md-12 col-sm-12">
			  		<#if (post.status == "published")>
			          	<h2>${post.title}</h2>
			          	<p><i class="fa fa-clock-o"></i> Posted on ${post.date?string("dd MMMM yyyy")}</p>
			          		${post.body}
			          		<hr>
					</#if>
			    </div><!-- col-lg-8 -->
			</#list>
		</div><!-- /.row -->
	</div> <!-- /.container -->
</div> <!-- /.section -->



<#include "footer.ftl">



