<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $kode_material
 * @property string $nama_material
 * @property string $satuan
 * @property int $stok_saat_ini
 * @property int $harga_satuan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereHargaSatuan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereKodeMaterial($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereNamaMaterial($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereSatuan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereStokSaatIni($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Material whereUpdatedAt($value)
 */
	class Material extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $material_id
 * @property string $jenis
 * @property int $jumlah
 * @property int|null $unit_id
 * @property int $user_id
 * @property string|null $keterangan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Material $material
 * @property-read \App\Models\Unit|null $unit
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereJenis($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereJumlah($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereMaterialId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereUnitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MaterialMutation whereUserId($value)
 */
	class MaterialMutation extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $nama_unit
 * @property string|null $tipe
 * @property int $progress_persen
 * @property string $status_terakhir
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\UnitProgressLog|null $latestLog
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MaterialMutation> $materialMutations
 * @property-read int|null $material_mutations_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UnitProgressLog> $progressLogs
 * @property-read int|null $progress_logs_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit whereNamaUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit whereProgressPersen($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit whereStatusTerakhir($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit whereTipe($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Unit whereUpdatedAt($value)
 */
	class Unit extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $unit_id
 * @property int $progress_lama
 * @property int $progress_baru
 * @property string|null $keterangan
 * @property string|null $foto_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Unit $unit
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereFotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereProgressBaru($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereProgressLama($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereUnitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UnitProgressLog whereUpdatedAt($value)
 */
	class UnitProgressLog extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $role
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

