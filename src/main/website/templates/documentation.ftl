<#include "header.ftl">

	<div class="section">
	    <div class="container">
			<div class="page-header">
		  		<h1><#escape x as x?xml>${content.doctitle}</#escape></h1>
		  		<small>Revision 1.0, December 2013, Author: ${content.author} </small>
			</div>

		    ${content.body}

    	</div><!-- container -->
    </div><!-- section -->

<#include "footer.ftl">