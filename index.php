<?PHP
$title = 'BMoreToken Project Home (BALT)';
include_once('menu.php');
?>
<div class="container">
<center>    
 <p>Baltimore Time: <?PHP echo date('r'); ?></p>
 <p>Total Supply: 3,947,960 BALT</p>
 <p>Holders: 12</p>
 <p>Transfers: 25</p>
 <p>Address: 0xbdd4f273c2b0f0b84a51bd733aac617d91159376</p>
 <p>Liquidity: 7,620 BALT &amp; 1.585 WETH ($3,801.53 USD)</p>
</pre>
 </center>
    <div class="row justify-content-md-center">
     <div class="col-md-auto">
       <a target='_Blank' type="button" class="btn btn-success btn-lg btn-block" href='https://analytics.sushi.com/pairs/0x08cd7cf527330f10571fb7947256bf0c8b38afc4'>SushiSwap Analytics</a>
     </div>
     <div class="col-md-auto">
       <a target='_Blank' type="button" class="btn btn-primary btn-lg btn-block" href='https://etherscan.io/token/0xbdd4f273c2b0f0b84a51bd733aac617d91159376'>EtherScan</a>
      </div>
      <div class="col-md-auto">
        <a target='_Blank' type="button" class="btn btn-info btn-lg btn-block" href='https://blockchain.coinmarketcap.com/address/ethereum/0xbdd4f273c2b0f0b84a51bd733aac617d91159376'>CoinMarketCap</a>
      </div> 
      <div class="col-md-auto">
        <a target='_Blank' type="button" class="btn btn-warning btn-lg btn-block" href='https://www.tradingview.com/chart/?symbol=SUSHISWAP%3ABALTWETH'>TradingView</a>
      </div>
        
    </div>

<br>


<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div id="tradingview_78171"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BALTWETH/?exchange=SUSHISWAP" rel="noopener" target="_blank"><span class="blue-text">BALTWETH Chart</span></a> by TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "width": 980,
  "height": 610,
  "symbol": "SUSHISWAP:BALTWETH",
  "interval": "240",
  "timezone": "America/New_York",
  "theme": "light",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "allow_symbol_change": true,
  "container_id": "tradingview_78171"
}
  );
  </script>
</div>
<!-- TradingView Widget END -->


<center><img src='qr.png' class="img-fluid" alt="Responsive image"><br>
<small>Contract Address: 0xbdd4f273c2b0f0b84a51bd733aac617d91159376</small></center>
    </div>
<?PHP

include_once('footer.php');

?>
