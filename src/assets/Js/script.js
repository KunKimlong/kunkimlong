import skill from "./data";
$(document).ready(function(){
    
    var heightNavbar = $('.navbar').outerHeight();
    // alert(heightNavbar)
    $('.blog-about').css('height','calc(100vh - '+heightNavbar+'px)');
    $('.blog-about').css('margin-top',heightNavbar+'px');
    $('.link-contect').click(function(){
        $(this).addClass('active')
    });
    
    $(window).on('scroll',function(){
        var scrollPosition = $(document).scrollTop();
        // console.log(scrollPosition);
        if(scrollPosition<2237){
            $('.link-contect').removeClass('active');
        }
        else{
            $('.link-contect').addClass('active');
        }
    });
    console.log(skill);
    var txt = '';
    skill.forEach(el=>{
        txt +=`
            <li>
                  + ${el.based}
                  <ul>`;
        var parts = el.part;
        parts.forEach(part=>{
            txt+=`
                <li>
                    <div class="title">${part.language}</div>
                    <div class="outside-gray">
                    <div class="inside-gray" style="width:${part.percent}%"></div>
                    </div>
                </li>
            `
        })
        txt+=`
            </ul>
        </li>
        `;
    })

    $('#skill').html(txt)

    $('body').on('click','.bi-justify-left',function(){
        $('.navbar-collapse').css('top',heightNavbar+'px');
        $('.navbar-collapse').css('left','0');
        $('.bi-justify-left').addClass('bi-x-lg');
        $('.bi-justify-left').removeClass('bi-justify-left');
    })
    $('.navbar-collapse').click(function(){
        $('.navbar-collapse').css('top','-100%');
        $('.navbar-collapse').css('left','-100%');
        $('.bi-x-lg').addClass('bi-justify-left');
        $('.bi-x-lg').removeClass('bi-x-lg');
    })
    $('body').on('click','.bi-x-lg',function(){
        $('.navbar-collapse').css('top','-100%');
        $('.navbar-collapse').css('left','-100%');
        $('.bi-x-lg').addClass('bi-justify-left');
        $('.bi-x-lg').removeClass('bi-x-lg');
    })


    var heightProject = $('.blog-project').outerHeight();
    var viewportHeight = window.innerHeight;//100vh convert to px = 483
    console.log(viewportHeight);
    console.log(heightProject);
    console.log((heightProject-viewportHeight)<viewportHeight);
    if((heightProject-viewportHeight)<viewportHeight){
        $(".blog-project").css('height','100vh');
    }
    else{
        $(".blog-project").css('height','auto');
    }
    
});