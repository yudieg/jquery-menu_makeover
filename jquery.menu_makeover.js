/* Menu Makeover */
(function($) {
	$.fn.menu_makeover= function(settings) {
    settings = jQuery.extend({
      delay:100,
      show_speed:200  
    });
    var matches = this;
    var hover_item = undefined;
    function hide_all(){

      $(matches).find('>li').each(function(){
        if(hover_item !=undefined){
          if( hover_item != this ){
      	    //if(submenu_timer){clearTimeout(submenu_timer); submenu_timer = false };        
            $(this).find('>ul').fadeOut(settings.show_speed);  
            //console.log($(this).data('showing'));
            $(this).data('shown',false);
            $(this).data('showing',false);
          } 
        }
          
      });
      
 
    }
 
 
	  $(this).children().each(function(){
	    
      var submenu_timer = false;
      var showing  = false;
      var shown = false;
      var hiding = false;
      $(this).data('showing',false);
      $(this).data('shown',false);
      $(this).data('hiding',false);
      
      function print_this(){
      	//console.log(this);	
     	}
	    var _parent = parent;
      var submenu = $(this).find('>ul');
 
	    
	    if(submenu.get(0)!=undefined){
	      this.submenu = submenu;
	      submenu.each(function(){
 
	        $(this).hover(
    	      function(){
    
    	         if(submenu_timer){clearTimeout(submenu_timer); submenu_timer = false}
    	         
    	      }, 
    	      function(){
              submenu_timer = setTimeout(function(){
                submenu_timer = false;
    	          $(this).fadeOut(function(){
    	            shown = false;
		              $(this).parent().data('shown',false);
    	          
    	          });    
    	        },settings.delay);
    	      }
  	      );
	      });
	      submenu.menu_makeover(settings);
	      
	    }
    /*
      // not quite useful
      $(this).get(0).close = close = function(){
        if(submenu){
          submenu.hide();
          shown = false;
 
        }
	    }
	    */
	    $(this).hover(
  	    // Mouseover <li>
  	    function(){
         // alert(submenu.get(0));
          if(submenu_timer){
            clearTimeout(submenu_timer);
            submenu_timer = false;
            //if(hiding){
              showing = false;
              shown = false;
              $(this).data('showing',false);
              $(this).data('hiding',false);
              //console.log('submenu_timer return');
            //}
          }
          
          
          if($(this).data('showing') || $(this).data('shown') ){
            if($(this).data('hiding') == false){
              hover_item = this; 
              //console.log('showing, shown, !hiding return');
              return;
            }
          } 
          
          if($(this).data('hiding') == false){ 
            if(hover_item == this ){
              //console.log('!hiding & hover_item=this return');
            	return;
            }
          }
          
          hover_item = this; 
          
          showing = true;
          $(this).data('showing',true);
          hide_all();
          
          //close();
          
          if(submenu){
            //submenu.css({'margin-left':'-4px','opacity':0,'display':'block'}).animate({'margin-left':'0','opacity':1},300,'swing' ,function(){
            //submenu.fadeIn(function(){
            submenu.slideDown(100,function(){
              showing = false;
              shown = true;
              $(this).data('showing',false);
              $(this).data('shown',true);
              
            });  
          }          
          
  	    },
  	    // Mouseout <li>
  	    function(){
 
	        shown = false;  
          $(this).data('shown',false);
	        
  	      if(submenu){
  	        if(submenu_timer){clearTimeout(submenu_timer); submenu_timer = false };
  	        $(this).data('hiding',true);
  	        hiding = true;
  	        //console.log('hiding: ' + hiding);
  	        
  	        var the_hider = new hide_callback(this,submenu, submenu_timer );
            submenu_timer = setTimeout( the_hider.execute ,settings.delay);
  	        
  	      }
  	    }
	    ).click(function(){
	      
	      document.location= $(this).find('>a').attr('href');  
	    });  
	    

	    
	    
	    
	  })

	
	  function hide_callback(obj,submenu,submenu_timer){
	  	var _obj = obj;
	  	var _submenu = submenu;
			 	
	  	this.execute = function(){
	    		hover_item = null;
	 
	  		$(_obj).data('hiding',true);
	    	submenu_timer = false;
	    	$(_submenu).fadeOut(settings.show_speed, function(){
	    		$(_obj).data('shown', false);
	    		$(_obj).data('hiding',false);
	    		hover_item = null;
	    	} );
	  	}
	  	
	  	
	 	}	
 		  
	};


	
	
})(jQuery);  	  


function debug(str){
  if($('#debug').get(0)==undefined){
    $('body').append('<div id="debug" style="position:absolute;top:0;left:0;z-index:100"></div>');    
  }
  $('#debug').append('<div>' + str + '</div>');
  
}