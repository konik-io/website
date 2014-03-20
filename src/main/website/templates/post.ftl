<#-- 
<#include "header.ftl">
	
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
    
<#include "footer.ftl">

-->