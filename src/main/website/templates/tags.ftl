<#include "header.ftl">
<#include "navbar.ftl">

<div id="Tag" class="section">
    <div class="container">
        <div class="page-header">
            <div>
              <h1>Blogeinträge mit dem <strong>${tag}</strong> Tag</h1>
            </div>
        </div>
    </div>
            
    <div class="container">   
        <#list tag_posts as post>
        <#if (last_month)??>
            <#if post.date?string("MMMM yyyy") != last_month>
                    <h4>${post.date?string("MMMM yyyy")}</h4>
            </#if>
        <#else>
            <h4>${post.date?string("MMMM yyyy")}</h4>            
        </#if>
        
        <h4><a href="/${post.uri}">${post.title}</a></h4>
        <#assign last_month = post.date?string("MMMM yyyy")>
        </#list>     
    </div>
    
<#include "footer.ftl">