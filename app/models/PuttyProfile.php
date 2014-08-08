<?php
namespace Schneenet\PuttyColors\Models;

class PuttyProfile extends \Illuminate\Database\Eloquent\Model
{
	protected $fillable = ['color_data', 'session_name'];
	
	protected $dates = ['created_at', 'modified_at', 'deleted_at'];
	
	/**
	 * <p>Ensure the given hash's keys exactly match a valid color_data member for a profile</p>
	 * <p>A valid color_data member contains exactly only the following list of keys:</p>
	 * <ul>
	 * <li>colour0</li>
	 * <li>colour1</li>
	 * <li>colour2</li>
	 * <li>colour3</li>
	 * <li>colour4</li>
	 * <li>colour5</li>
	 * <li>colour6</li>
	 * <li>colour7</li>
	 * <li>colour8</li>
	 * <li>colour9</li>
	 * <li>colour10</li>
	 * <li>colour11</li>
	 * <li>colour12</li>
	 * <li>colour13</li>
	 * <li>colour14</li>
	 * <li>colour15</li>
	 * <li>colour16</li>
	 * <li>colour17</li>
	 * <li>colour18</li>
	 * <li>colour19</li>
	 * <li>colour20</li>
	 * <li>colour21</li>
	 * </ul>
	 * @param array $hash
	 */
	public static function hashKeysMatchColorProfile(array $hash)
	{
		$COLOR_DATA_PROFILE = array(
			"colour0" => 1,
			"colour1" => 1,
			"colour2" => 1,
			"colour3" => 1,
			"colour4" => 1,
			"colour5" => 1,
			"colour6" => 1,
			"colour7" => 1,
			"colour8" => 1,
			"colour9" => 1,
			"colour10" => 1,
			"colour11" => 1,
			"colour12" => 1,
			"colour13" => 1,
			"colour14" => 1,
			"colour15" => 1,
			"colour16" => 1,
			"colour17" => 1,
			"colour18" => 1,
			"colour19" => 1,
			"colour20" => 1,
			"colour21" => 1
		);
		return count(array_diff_key($hash, $COLOR_DATA_PROFILE)) == 0 && count(array_diff_key($COLOR_DATA_PROFILE, $hash)) == 0;
	}
}