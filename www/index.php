<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>PuTTY Colors</title>
<link rel="stylesheet" href="css/bootstrap.css" />
<link rel="stylesheet" href="css/spectrum.css" />
<link rel="stylesheet" href="css/putty.css" />
<style id="preview_style"></style>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-static-top" role="navigation">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">PuTTY Colors</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#" data-toggle="modal" data-target="#modal_presets"><span class="glyphicon glyphicon-star"></span>&nbsp;Load Preset</a></li>
					<li><a href="#" data-toggle="modal" data-target="#modal_import"><span class="glyphicon glyphicon-floppy-open"></span>&nbsp;Import</a></li>
					<li><a href="#" data-toggle="modal" data-target="#modal_export"><span class="glyphicon glyphicon-floppy-save"></span>&nbsp;Export</a></li>
					<li><a href="#" data-toggle="modal" data-target="#modal_share"><span class="glyphicon glyphicon-share"></span>&nbsp;Share</a></li>
				</ul>

			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>
	<form class="container-fluid">
		<div class="row">
			<div class="col-md-6 col-sm-12">
				<div class="putty-preview">
					<div class="border-top">
						<img src="img/border_top_left.png" alt="tl" class="pull-left" /> <img src="img/border_top_icon.png" alt="icon" class="pull-left" />
						<div id="preview_title" class="title">PuTTY</div>
						<img src="img/border_top_right.png" alt="tr" class="pull-right" />
					</div>
					<div class="border-left"></div>
					<div class="border-right"></div>
					<div class="border-bottom">
						<img src="img/border_bottom_left.png" alt="bl" class="pull-left" /> <img src="img/border_bottom_right.png" alt="br" class="pull-right" />
					</div>
					<div id="preview_content" class="content"></div>
				</div>
			</div>
			<div class="col-md-6 col-sm-12 form-horizontal">
				<div class="form-group">
					<label for="field_preset_name" class="col-sm-3 col-xs-12 control-label">Session Name</label>
					<div class="col-sm-9 col-xs-12">
						<input type="text" name="preset_name" id="field_preset_name" class="form-control" placeholder="Default Session" />
					</div>
				</div>
				<div class="form-group">
					<label for="color_selection" class="col-sm-3 col-xs-12 control-label">Colors</label>
					<div class="col-sm-9 col-xs-12">
						<select id="color_selection" class="form-control">
							<option>Loading...</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<div class="col-md-offset-3 col-md-5 col-sm-12">
						<div id="color_picker"></div>
					</div>
					<div class="col-md-4 col-sm-12 form-horizontal">
						<div class="form-group">
							<label for="field_cp_red" class="control-label col-sm-3 col-xs-4">Red</label>
							<div class="col-sm-4 col-xs-8">
								<input type="text" name="cp_red" id="field_cp_red" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label for="field_cp_green" class="control-label col-sm-3 col-xs-4">Green</label>
							<div class="col-sm-4 col-xs-8">
								<input type="text" name="cp_green" id="field_cp_green" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label for="field_cp_blue" class="control-label col-sm-3 col-xs-4">Blue</label>
							<div class="col-sm-4 col-xs-8">
								<input type="text" name="cp_blue" id="field_cp_blue" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label for="field_cp_hex" class="control-label col-sm-3 col-xs-4">Hex:</label>
							<div class="col-sm-6 col-xs-8">
								<input type="text" name="cp_hex" id="field_cp_hex" class="form-control">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>

	<footer>
		<strong>&copy; <?php echo date('Y'); ?> </strong> Matt Schneeberger / <a href="http://www.schneenet.com/">SCHNEENET Internet Services</a> -- <a href="LICENSE.txt">License</a> -- <a href="#" data-toggle="modal" data-target="#modal_credits">Credits</a>
	</footer>

	<div class="modal" id="modal_export" tabindex="-1" role="dialog" aria-labelledby="modal_export_title" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="modal_export_title">Export</h4>
				</div>
				<div class="modal-body">
					<ul id="tab_control_code" class="nav nav-tabs">
						<li class="active"><a href="#reg" data-toggle="tab">Registry Code</a></li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="reg">
							<textarea id="code_reg" rows="12" class="form-control">Loading...</textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal" id="modal_import" tabindex="-1" role="dialog" aria-labelledby="modal_import_title" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="modal_import_title">Import</h4>
				</div>
				<div class="modal-body">
					<textarea id="import_reg" rows="12" class="form-control" placeholder="Paste Windows Registry code here..."></textarea>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="action_import">Import</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="modal_credits" tabindex="-1" role="dialog" aria-labelledby="modal_credits_title" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="modal_credits_title">Credits</h4>
				</div>
				<div class="modal-body">
					<p><strong>Bits</strong></p>
					<ul>
						<li><a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/">PuTTY</a></li>
						<li><a href="http://jquery.com/">jQuery</a>
						<li><a href="http://getbootstrap.com">Bootstrap</a>
						<li><a href="http://bgrins.github.io/spectrum/">Spectrum</a> - Color Picker</li>
						<li><a href="https://github.com/douglascrockford/JSON-js">JSON-js</a>
					</ul>
					<p>Although we love and use PuTTY on a daily basis, we are not affiliated with or endorsed by Simon Tatham or the PuTTY team.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="modal_presets" tabindex="-1" role="dialog" aria-labelledby="modal_presets_title" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="modal_presets_title">Presets</h4>
				</div>
				<div class="modal-body">
					<ul class="list-group" id="preset_list"></ul>
				</div>
				<div class="modal-footer">
					<div id="modal_preset_loader" style="float: left; display: none; text-align: center;"><img src="img/loading.gif" alt="loading" style="vertical-align: middle;" />&nbsp;Loading...</div>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<script src="js/json2.js"></script>
	<script src="js/jquery-1.11.1.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/spectrum.js"></script>
	<script src="js/putty.js"></script>
</body>
</html>