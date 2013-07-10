
/*
Tipue drop 3.0
Copyright (c) 2013 Tipue
Tipue drop is released under the MIT License
http://www.tipue.com/drop
*/


(function($) {

     $.fn.tipuedrop = function(options) {

          var set = $.extend( {
          
               'show'                   : 5,
               'maxWidth'               : 400,
               'speed'                  : 300,
               'newWindow'              : false,
               'mode'                   : 'static',
               'contentLocation'        : 'celebs/database.json'
          
          }, options);
          
          return this.each(function() {
          
               var tipuedrop_in = {
                    pages: []
               };
               $.ajaxSetup({
                    async: false
               });                 
                              
               if (set.mode == 'json')
               {
                    $.getJSON(set.contentLocation,
                         function(json)
                         {
                              tipuedrop_in = $.extend({}, json);
                         }
                    );
               }
               if (set.mode == 'static')
               {
                    tipuedrop_in = $.extend({}, celebs);
               }

               $(this).keyup(function(event)
               {
                    getTipuedrop($(this));
               });               
               
               function getTipuedrop($obj)
               {
                    if ($obj.val())
                    {
                         var out = '';
                         var c = 0;
						 var first = 1;
                         for (var i = 0; i < tipuedrop_in.pages.length; i++)
                         {
							  
								
                              var pat = new RegExp($obj.val(), 'i');
                              if ((tipuedrop_in.pages[i].title.search(pat) != -1 || tipuedrop_in.pages[i].text.search(pat) != -1 || tipuedrop_in.pages[i].tags.search(pat) != -1) && c < set.show)
                              {
								   var divclass = "tipue_drop_item";
								   if(first==1){
								       divclass = "tipue_drop_item_selected";
									   first=0;
								   }
                                   out += '<a href="' + tipuedrop_in.pages[i].loc + '"';
                                   if (set.newWindow)
                                   {
                                        out += ' target="_blank"';
                                   }
                                   out += '><div class="' + divclass + '" style="max-width: ' + (set.maxWidth - 40) + 'px;"><table><tr><td><img src="' + tipuedrop_in.pages[i].thumb + '" class="tipue_drop_image" alt="' + tipuedrop_in.pages[i].title + '">';
                                   out += '</td><td><div class="tipue_drop_text">' + tipuedrop_in.pages[i].text + '</div></td></tr></table></div></a>';
                                   c++;
                              }
                         }
                         if (c == 0)
                         {
                              out += '<div class="tipue_drop_no_items">No suggestions</div>';     
                         }
                                        
                         $('#tipue_drop_content').html(out);
                         $('#tipue_drop_content').fadeIn(set.speed);
                    }
                    else
                    {
                         $('#tipue_drop_content').fadeOut(set.speed);     
                    }
               }
               
               $('html').click(function()
               {
                    $('#tipue_drop_content').fadeOut(set.speed);
               });
          
          });
     };
     
})(jQuery);
