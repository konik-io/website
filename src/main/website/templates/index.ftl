<#include "header.ftl">

<a href="https://github.com/konik-io"><img align="right"
   src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" alt="Fork me on GitHub"></a>

<div id="Intro" class="section">

   <div class="container">

      <div class="row">

         <div class="col-lg-6 col-md-6 col-sm-6">
            <h1>Konik, die Open Source ZUGFeRD Bibliothek</h1>
            <h1><small>enthält alles zum lesen, schreiben und validieren von ZUGFeRD Rechnungen.</small></h1>

            <div class="">
               <a href="#Quickstart" class="btn btn-lg btn-primary">Schnellstart!</a>
            </div>
         </div>

         <div class="col-lg-6 col-md-6 col-sm-6">
            <img src="img/konik-logo-on-white-bg.png" class="img-responsive img-customer">
         </div>

      </div>

   </div>

</div>

<div class="section-colored">

   <div class="container">

      <div class="row">
         <div class="col-lg-12 col-md-12">
            <h1>Argumente für die Konik Bibliothek</h1>
         </div>
      </div>
      <!-- /.row -->

      <div class="row">
      
         <div class="col-lg-4 col-md-4">
            <h3>
               <i class="fa fa-heart"></i> Open Source
            </h3>
            <p>
               Konik ist die erste Bibliothek, welche <a href="http://www.ferd-net.de">ZUGFeRD</a> konforme Rechnungen 
               erstellen, lesen und validieren kann. Verfügbar als Open Source für Java und .NET. Details zu <a
                  href="/license.html">Lizenzbestimmungen.</a>
            </p>
         </div>
         <div class="col-lg-4 col-md-4">
            <h3><i class="fa fa-truck"></i> Alles drin</h3>
            <p>Einfache und verständliche API komplett dokumentiert machen eien integration in kürzester Zeit möglich 
               ohne sich mit XML Interna oder ZUGFeRD Spezifikation beschäftigen zu müssen.</p>
         </div>
         <div class="col-lg-4 col-md-4">
            <h3><i class="fa fa-trophy"></i> Support</h3>
            <p>Die Konik Bibliothek kommt mit Professioneller Unterstützung und Sopport. Wir unterstützen Sie oder übnehmen für Sie die 
            Realisierung ganzer Projekten mit ZUGFeRD Integration sowie der Gestalltung und optimierung von Rechnungsprozessen.</p>
         </div>
      </div>
      
      <div class="row">
         <div class="col-lg-4 col-md-4">
            <h3><i class="fa fa-gears"></i> Funktionen</h3>
            <p>Eins zu eins Abbildung des ZUGFeRD Models</p>
            <p>Validierung des Models und <abbr title="ge­ge­be­nen­falls">ggf.</abbr> Korrektur</p>
            <p>XML Unabhängig</p>
         </div>
         <div class="col-lg-4 col-md-4">
            <h3>
               <i class="fa fa-gear"></i> Mehr
            </h3>
            <p>Konvertierung des ZUGFeRD Models in XML oder eines anderen Formats</p>
            <p>Anhängen von XML Dateien an PDFs und PDF nach PDF/A3 konvertierung</p>
            <p>Extrahieren vom ZUGFeRD XML Dateien aus PDFs</p>
         </div>
         <div class="col-lg-4 col-md-4">
            <h3><i class="fa fa-rocket"></i> PDF an Board</h3>
            <p>Konik unterstützt verschiedene PDF Bibliotheken von verschiedenen Anbietern, die es erlauben
               den PDF Teil der ZUGFeRD Rechnung mit der PDF Bibliothek zu integrieren.</p>
         </div>
      </div>
      <!-- /.row -->

   </div>
   <!-- /.container -->

</div>
<!-- /.section -->


<div id="Quickstart" class="section">

   <div class="container">

      <div class="row">

         <div class="col-lg-12 col-md-12 col-sm-12">
            <h2>Schnellstart</h2>
         </div>

         <div class="col-lg-6 col-md-6 col-sm-6">

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
               <li class="active"><a href="#konik-maven-dependecy" role="tab" data-toggle="tab">Konik</a></li>
               <li><a href="#pdfbox-carriage" role="tab" data-toggle="tab">PDFBox-Carriage</a></li>
               <li><a href="#itext-carriage" role="tab" data-toggle="tab">iText-Carriage</a></li>
               <li><a href="#dotNet" role="tab" data-toggle="tab">.NET</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
               <div class="tab-pane active no-margin" id="konik-maven-dependecy">
                  <pre class="highlight">
<code class="xml">
    &lt;dependency&gt;
        &lt;groupId&gt;io.konik&lt;/groupId&gt;
        &lt;artifactId&gt;konik&lt;/artifactId&gt;
        &lt;version&gt;0.8.0&lt;/version&gt;
    &lt;/dependency&gt;
   </code>
                 </pre>
               </div>
               <div class="tab-pane no-margin" id="pdfbox-carriage">
                  <pre class="highlight">
<code class="xml">
    &lt;!-- plugin to invoice attach or extract with pdfBox --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.konik&lt;/groupId&gt;
        &lt;artifactId&gt;pdfbox-carriage&lt;/artifactId&gt;
        &lt;version&gt;0.8.0&lt;/version&gt;
    &lt;/dependency&gt;
   </code>
                 </pre>
               </div>
               <div class="tab-pane no-margin" id="itext-carriage">
                  <pre class="highlight">
<code class="xml">
    &lt;!-- plugin to invoice attach or extract with iText --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.konik&lt;/groupId&gt;
        &lt;artifactId&gt;itext-carriage&lt;/artifactId&gt;
        &lt;version&gt;0.8.0&lt;/version&gt;
    &lt;/dependency&gt;
   </code>
                 </pre>
               </div>
               <div class="tab-pane no-margin" id="dotNet">
                  <pre class="highlight">
<code class="bash">
   # with <a href="http://docs.nuget.org/docs/start-here/using-the-package-manager-console">Package Manager Console</a> 
   PM> Install-Package https://www.nuget.org/packages/konik-zugferd[konik-zugferd]
   </code>
                 </pre>
               </div>
            </div>
         </div>


         <div class="col-lg-6 col-md-6 col-sm-6">
            <p>
               Der schnellste Weg die Konik Bibliothek in ein Projekt einzubinden ist mit Hilfe eines Dependency
               Management Systems mit zugriff auf <a href="http://search.maven.org/#search|ga|1|g%3A%22io.konik%22">Maven
                  Central Repository</a> oder <a href="https://www.nuget.org/packages/konik-zugferd/">NuGet</a> für
               .NET.
            </p>
            <p>Das linke Fenster enthält Anweisungen für die Verschiedenen Pakete.</p>
            <p>Das <a href="/docs/index.html#_setup">Setup Kapitel</a> der Dokumentation enthält weitere details und vorgehensweisen für die verschiedene Umgebungen.</p>
            
            <h3>Alternative</h3>
            <p>Auch ohne eine Dependency Management System steht die gesamte Konik Bibliothek mit allen
               Abhängigkeiten, Plug-Ins und Dokumentation als eigenständige ZIP distribution zur verfügung.</p>
            <div>
               <a id="download-zip-package"
                  href="https://oss.sonatype.org/content/repositories/releases/io/konik/distribution/0.8.0/distribution-0.8.0.zip"
                  class="btn btn-lg btn-primary download-zip-package">Download Zip</a>
            </div>
         </div>
      </div>
      <!-- /.row -->
   </div>
   <!-- /.container -->
</div>

<div id="Support" class="section-colored">

   <div class="container">

      <div class="row">

         <div class="col-lg-12 col-md-12 col-sm-12">
            <h2>Hilfe und Kontakt</h2>
         </div>

         <div class="col-lg-4 col-md-6 col-sm-12">
            <article class="full">
               <div>
                  <header>
                     <h3>
                        <i class="fa fa-stack-overflow fa-2x"></i> Stack Overflow
                     </h3>
                  </header>
                  <p>
                     Wenn Sie technische Fragen haben zur Implementierung Ihrer Lösung mit der Konik Bibliothek, dann
                     ist StackOverflow der richtige Ort diese Fragen zu stellen. <a
                        href="//stackoverflow.com/questions/tagged/konik+or+konik.io" target="_blank">überprüfen</a> Sie
                     ob eine Ähnliche Frage schon zuvor gestellt wurde und erstellen Sie gegebenenfalls eine <a
                        href="//stackoverflow.com/questions/ask" target="_blank">neue Frage.</a> Wir <a
                        href="//stackoverflow.com/questions/tagged/konik+or+konik.io">beobachten</a> alle Fragen in
                     verbindung mit der Konik Bibliothek und antworten so schnell wie möglich.
                  </p>
               </div>
            </article>
         </div>


         <div class="col-lg-4 col-md-6 col-sm-12">
            <article class="full">
               <div>
                  <header>
                     <h3>
                        <i class="fa fa-bug fa-2x"></i> Bugs und neue Funktionalitäten
                     </h3>
                  </header>
                  <p>
                     Bug gefunden? Der schnellste Weg zu einer Lösung ist es ein <a
                        href="https://github.com/konik-io/barn/issues/new" target="_blank">Ticket zu erstellen</a> auf
                     GitHub. <a href="https://github.com/konik-io/barn/issues" target="_blank">see</a> if a similar
                     ticket already exists and comment on that. We always try our best to provide a fix for the next
                     release.
                  </p>
                  <p>Das Ticketsystem von GitHub ist auch ein perfekter Ort für Erweiterungswünsche.</p>
               </div>
            </article>
         </div>

         <div class="col-lg-4 col-md-6 col-sm-12">
            <article class="full">
               <div>
                  <header>
                     <h3>
                        <i class="fa fa-comments-o  fa-2x"></i> Diskussionsforum
                     </h3>
                  </header>
                  <p>Sind Sie interessiert an der Bibliotheksentwicklung oder möchten Sie mehr über die ZUGFeRD
                     Spezifikation und deren Details erfahren oder, wie Sie elektronische Rechnungsstellung in Ihr
                     Produkt integrieren können?</p>
                  <p>
                     Tretten Sie dem <a href="https://groups.google.com/forum/#!forum/konik-io" target="_blank">Konik
                        Diskussionsforum</a> bei und nehmen Sie teil an Diskussionen oder vefolgen Sie die Weiterentwicklung
                     von Konik.
                  </p>
               </div>
            </article>
         </div>

      </div>
   </div>


   <div class="container">
      <div class="row well">
         <div class="col-lg-8 col-md-8">
            <h4>Direkter Kontakt</h4>
            <p>Wenn Sie glauben, dass GitHub und Stackoverflow nicht die richtigen Orte für Ihr Anliegen sind.</p>
         </div>
         <div class="col-lg-4 col-md-4">
            <button class="btn btn-lg btn-primary pull-right" data-toggle="modal" data-target=".bs-contact-modal">E-mail
               schreiben</button>
         </div>
      </div>
      <div class="modal fade bs-contact-modal" tabindex="-1" role="dialog" aria-labelledby="modalKontactTitle"
         aria-hidden="true">
         <div class="modal-dialog modal-sm">
            <div class="modal-content jumbotron">
               <h3 class="modal-title" id="modalKontactTitle">Kontakt E-Mail:</h3>
               <span>
                  hello<span style="display: none">_wronghere_</span>@<span style="display: none">_wronghere_</span>konik.io
               </span>
            </div>
         </div>
      </div>
   </div>



</div>

<#include "footer.ftl">
