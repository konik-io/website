<#include "header.ftl">
  	
  	
    <div class="container">

      <div class="row">
        <div class="col-lg-12">
          <h1 class="page-header">&lt;B&gt;log</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
			<#list posts as post>
		  		<#if (post.status == "published")>
		          	<h2>${post.title}</h2>
		          	<p><i class="fa fa-clock-o"></i> Posted on ${post.date?string("dd MMMM yyyy")}</p>
		          	<#if (post.abbreviation)??> <#-- if we have defined an abbreviation-->
		          		<p>${post.abbreviation}...</p>
					</#if>  
		          		<a class="btn btn-primary" href="${post.uri}">Read More <i class="fa fa-angle-right"></i></a>
		          		<hr>
				</#if>
		  	</#list>
        </div><!-- col-lg-8 -->
        
        <div class="col-lg-4">
          
          
          <div class="well">
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
					  <button class="btn btn-default btn-sm dropdown-toggle margin" type="button" data-toggle="dropdown">${key}<span class="caret"></span></button>
					  <ul class="dropdown-menu">
					    <#list tag_posts[key] as p>
					    	  <li><a href="${p.uri}">${p.title}</a></li>
					    </#list>
					  </ul>
				  </div><!--btn-group -->
				</#list>
			  
          </div><!-- /well -->
          
        </div><!-- col-lg-4 -->
        
      </div> <!-- row -->
      
    </div><!-- /.container -->


<#include "footer.ftl">



