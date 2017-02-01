


var allstudentitem=$('.student-item');
var allstudentsearch ='<div class="allstudentsearch"><input id="search" placeholder="Search for students"><button>Search</button></div>';
var pagination ='<div class="pagination"><ul></ul></div>';
var allstudentlist = studentpage(allstudentitem);


//append for search option on .page-header-------->
$('.page-header.cf').append(allstudentsearch);


/*storing all students data in array and showing in pagination .per page only 10 students
and returning pagearray
*/
function studentpage(list){
  var newlist=list.slice();
    var pagearray=[];
  while(newlist.length){
    pagearray.push(newlist.splice(0,10));
}
return pagearray;
}
//now displaying first page from array and hiding rest pages from array------------------------>

   function displaypage(pageno,pagelist){
         $(".student-list li").hide();
          $.each(pagelist,function(index,page){
           if(pageno===index){
           $.each(page,function(i,listitem){
          $(listitem).fadeIn('fast');
            });
          }
       });
    }
//append pages with respect to students dynamically----------------------------->
          function pagebutton(pagelist){
             $('.page').append(pagination);
               var nopages=pagelist.length;
        for(var i=0;i<=nopages;i++){
            var buttons='<li><a href="#">'+i+'</a></li>';
               $('.pagination ul').append(buttons);
                 }
          $('.pagination ul li a').first().addClass('active');
//add events on clicking pages
           $(".pagination ul li a").on("click",function(event){
            var selectpage=parseInt($(this)[0].text)-1;
       displaypage(selectpage,pagelist);
           $(".pagination ul li a").removeClass();
            $(this).addClass("active");
          event.preventDefault();
         });
       }
// Search function finds both name and/or email. If no results are found, change the header H2 to display No Results, otherwise display default Students title. On firing of the searchList, check input value to see if matches, if there are matches, generate the new student array & display appropriate list of buttons.
function searchlist() {	
    var searchrule = $('#search').val().toLowerCase().trim();

        var findstudent = allstudentitem.filter(function(i) {
        	var email = $(this).find('.email').text();
            var name = $(this).find('h3').text();
            if (name.indexOf(searchrule) > -1 || email.indexOf(searchrule) > -1) {
                return true;
            }
            return false;
        });
        if (findstudent.length === 0 ) {
        	$('.page-header h2').text('Not Found');
        } else {
        	$('.page-header h2').text('Student...');
        }
        var pagingstudent = studentpage(findstudent);
        $('.pagination').remove();
        if (findstudent.length >= 10) {
          pagebutton(pagingstudent);
        }
        displaypage(0, pagingstudent);
}

  // Inits---------------------->
          pagebutton(allstudentlist);
          displaypage(0, allstudentlist);
// event handling while searching--->an input for search------->
$('.allstudentsearch').find('button').on('click', searchlist);
$('.allstudentsearch').find('input').keyup(searchlist);



