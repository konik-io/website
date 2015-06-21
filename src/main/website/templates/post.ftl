<#include "header.ftl">
<#include "navbar.ftl">

<div class="section">	
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
		 		<h1 class="page-header">${content.title}</h1>
			</div>
		</div>
		  
		<p><em>${content.date?string("dd MMMM yyyy")}</em></p>
		<div>
			${content.body}
		</div>	    
	</div>
</div> <!-- section-colored  --> 
   
<div class="section-colored">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h3>Weiterer Beiträge zum Thema <strong>${content.title}</strong></h3>
            </div>
        </div>
     
        <div class="row">
              <#assign tag_posts = {}>
              <#list posts as post>
                  <#if (post.status == "published" && (post.tags)??)>
                      <#list post.tags as tag>
                          <#assign tag_posts = tag_posts + {tag?trim:([post] + tag_posts[tag?trim]![] )}>
                      </#list>
                  </#if>
              </#list>
   
              <#list content.tags as tag>                                            
                <#list tag_posts[tag] as post>
                   <#if (post.uri != content.uri)>
                      <div class="col-md-6 col-sm-12">
                           <a href="/${post.uri}">${post.doctitle}</a>
                      </div>
                   </#if>
                </#list>
              </#list>
        </div>
    </div>
</div>
        
<#include "footer.ftl">
<#include "socket.ftl">