<!DOCTYPE html>
<html>
<head>
     <meta charset="utf-8">
     <link rel="stylesheet" type="text/css"
           href="http://localhost/06_library/style.css">
</head>
<body id="ztarget">
    <header>
		    <h2><a href="http://localhost/06_library/index.php"><img src="https://yt3.ggpht.com/-thKQ_YaH8MM/AAAAAAAAAAI/AAAAAAAAAAA/Eaihw8GhhlE/s88-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="생활코딩실습"></a></h2>
        <h1>2DoIs2Be and JoyWins ^_____^!!!</h1>
    </header>
    <nav>
      <ol>
        <?php
          require('../06_lib/db.php');
          require('../06_config/config.php');
          /*...보안을 위해 별도의 파일에서 배열로 받음.
          $zconn = zdb_init('localhost', 'root', 'z12345', 'zopentutorials');*/
          $zconn = zdb_init($zconfig["zhost"], $zconfig["zuser"], $zconfig["zpw"], $zconfig["zdbname"]);
          $zresult = mysqli_query($zconn, 'SELECT * FROM topic');

          while ($zrow = mysqli_fetch_assoc($zresult)) {
            //var_dump($zrow); //...받은 값 출력하기.
            echo '<li><a href="http://localhost/06_library/index.php?id='.$zrow['id'].' ">'
                 . htmlspecialchars($zrow['title'])
                 . '</a></li>' . "\n";
            //echo "<br/>";
          }
         ?>
      </ol>
    </nav>

    <div id="zcontrol">
      <input type="button" value="green"
             onclick="document.getElementById('ztarget').className='zgreen' "/>
      <input type="button" value="blue"
             onclick="document.getElementById('ztarget').className='zcyan' "/>
      <a href="http://localhost/06_library/write.php">글쓰기</a>
    </div>

    <article>
      <?php
        if(empty($_GET['id'])===false)
        {
          $zsql = "SELECT topic.id, topic.title, user.name, topic.description "
                  ." FROM topic LEFT JOIN user ON topic.author = user.id "
                  ." WHERE topic.id = " .$_GET['id'];
          $zresult = mysqli_query($zconn, $zsql);
          $zrow = mysqli_fetch_assoc($zresult);
          echo '<h2>' . htmlspecialchars($zrow['title']) . '</h2>';
          echo '<p>' . htmlspecialchars($zrow['name']) . '</p>';
          //...PHP 함수 strip_tags(적용할부분, 허용할태그) 를 사용하여 Escaping 하기.
          echo strip_tags($zrow['description'], '<a><h1><h2><h3><h4><h5><ul><ol><li><img>');
        }
       ?>

      <!--...S.Tawk Comments -->
      <div id="disqus_thread"></div>
      <script>
      /**
      *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
      *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      /*
      var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      */
        (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://ztestdisqus-1.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
      <!--...E.Tawk Comments -->

      <!--...S.Tawk Chatting -->
      <!--Start of Tawk.to Script-->
      <script type="text/javascript">
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/5922aeb676be7313d291dd38/default';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
      </script>
      <!--End of Tawk.to Script-->
      <!--...E.Tawk Chatting -->
    </article>
</body>
</html>
