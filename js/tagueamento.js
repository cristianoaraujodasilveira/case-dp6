// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.



var $Tageamento = (function ($, window, document, undefined) {
	// alias para variaveis globais
	var contatoSelector =  ".menu-lista-link.menu-lista-contato";
    var downloadSelector =  ".menu-lista-link.menu-lista-download";
    var formContatoSelector =  ".contato input";
    var cardsSelector = ".card.card-montadoras";
    var lightboxOpen = "lightbox-open"
	// Inicializa cada ação da tela, funções e métodos
	return {
		go : function () {
            for (var i in $Tageamento.init) {
                $Tageamento.init[i]();
            }
		},
		init : {
			// Initialize páginas
			inicializa : function() {       
			},
            captura_evento_contato: function() {
                $(document).on( 'click', contatoSelector, function(){
                    ga('send', 'event', 'menu', 'entre_em_contato', 'link_externo');
                });
            },
            captura_evento_download: function() {
                $(document).on( 'click', downloadSelector, function(){
                    console.log('download_pdf');
                    ga('send', 'event', 'menu', 'download_pdf', 'download_pdf');
                });
            },
            captura_evento_formulario_contato: function() {
                $(document).on( "blur", formContatoSelector, function(){
                    if ($.trim($(this).val()).length){
                        let id = $(this).attr("id");
                        ga('send', 'event', 'contato', id, 'preencheu');   
                    }       
                })
            },  
            captura_evento_cards_montadora: function() {
                $(document).on( 'click', cardsSelector, function(){
                    let label = $(this).data("id");
                    ga('send', 'event', 'analise', 'ver_mais', label);
                })
            },  
            captura_envento_form: function() {
                $(document).on("DOMSubtreeModified", "body", function(){
                    let class_attr = $("body").attr("class");
                    if (class_attr.includes(lightboxOpen)){
                        ga('send', 'event', 'contato', 'enviado', 'enviado');
                    }
                });
            } 
		},
		util : {


		}
	};
	// Pass in jQuery.
})(jQuery, this, this.document);
//
// Dar o pontapé inicial
//
$(document).ready(function () {
	$Tageamento.go();
});
