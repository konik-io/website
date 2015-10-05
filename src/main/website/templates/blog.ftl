<#include "header.ftl">
<#include "navbar.ftl">

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
            <div class="col-md-3 col-sm-12  col-md-push-9">
              <div class="">
                <h4>Post Tags</h4>
                    <#assign tag_posts = {}>
                    <#list posts as post>
                        <#if (post.status == "published" && (post.tags)??)>
                            <#list post.tags as tag>
                                <#assign tag_posts = tag_posts + {tag?trim:([post] + tag_posts[tag?trim]![] )}>
                            </#list>
                        </#if>
                    </#list>

                    <#list tag_posts?keys as key>
                      <div class="btn-group">
                          <button class="btn btn-default btn-sm dropdown-toggle margin" type="button" data-toggle="dropdown">${key} <span class="caret"></span></button>
                          <ul class="dropdown-menu">
                            <#list tag_posts[key] as p>
                                  <li><a href="/${p.uri}">${p.doctitle}</a></li>
                            </#list>
                          </ul>
                      </div><!--btn-group -->
                    </#list>
              </div><!-- /well -->
            </div><!-- col-lg-4 -->
            
      
      
            <div class="col-md-9 col-sm-12 col-md-pull-3">
			<#list posts as post>				
			  		<#if (post.status == "published")>			          	
                     <h3><a id="${post.title?replace(" ", "-")}" href="${post.uri}">${post.title}</a></h3>
                     <i class="fa fa-clock-o"></i> vom ${post.date?string("dd MMMM yyyy")}
                     <p>Tags: 
                     <#if ((post.tags)??)>
                            <#list post.tags as tag>
                                <a href='/tags/${tag}.html'>${tag}</a>
                            </#list>
                      </#if>
                     </p>			          					          	
					</#if>			    
			</#list>
            </div><!-- col-lg-8 -->
		</div><!-- /.row -->
	</div> <!-- /.container -->
</div> <!-- /.section -->



<#include "footer.ftl">
<#include "socket.ftl">



