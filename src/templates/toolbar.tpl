<div class="navbar navbar-inverse nopadding-top-bottom">
	<div class="container-fluid">

		<ul class="nav navbar-nav">
			<li class="active"><a href="#" click="click:importFromJSON">Load <span class="sr-only">(current)</span></a></li>
			<li><a href="#" data-on="click:save">Save</a></li>
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Other<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a href="#" data-on="click:importFromJSON">Import from JSON</a></li>
					<li role="separator" class="divider"></li>
					<li><a href="#" data-on="click:exportToJSON">Export to JSON</a></li>
				</ul>
			</li>
		</ul>

		<div class="navbar-form navbar-right">
			<div class="form-group">
				<label for="height" class="navbar-text nopadding-top-bottom">H:</label>
				<input type="number" name="height" class="form-control" data-bind="height"/>
			</div>
		</div>
		
		<div class="navbar-form navbar-right">
			<div class="form-group">
				<label for="width" class="navbar-text nopadding-top-bottom">W:</label>
				<input type="number" name="width" class="form-control" data-bind="width"/>
			</div>
		</div>
		
		<div class="navbar-form navbar-right">
			<div class="form-group">
				<label for="bg" class="navbar-text nopadding-top-bottom">BG:</label>
				<input type="color" data-bind="backgroundColor">
			</div> 
		</div>
	</div>
</div><!-- /.row -->



