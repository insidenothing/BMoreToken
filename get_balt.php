<?PHP
$title = 'Get 1 $BALT for FREE this Friday!';
include_once("menu.php");
?>
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col-md-auto">
      <form method="POST" action="https://www.bmorecoin.com/request_balt.php">
        <div class="form-group" style="height:200px;"><center><br><br>
          <label for="exampleFormControlFile1">Enter your ERC20 Address Below</label><br><br>
          <input type="text" size="49" minlength="42" maxlength="42" id="address" name="address" required><br><br>
          <input class="btn btn-success" name='submit' value='Get 1 BALT for FREE this Friday!' type="Submit"></center>
        </div>
      </form> 
      <hr>
      <h3>Addresses in Next Drop</h3>
      <div id="success"></div>
      <div id="error"></div>
      <script>
      $( "#success" ).load( "https://www.bmorecoin.com/next_drop.php", function( response, status, xhr ) {
        if ( status == "error" ) {
          var msg = "Sorry but there was an error: ";
          $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
        }
      });
      </script>
    </div>
  </div>
</div>
<?PHP
include_once("footer.php");
?>
