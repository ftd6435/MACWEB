<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class MediaController extends Controller
{
    private const MAX_WIDTH = 1920;
    private const MAX_HEIGHT = 1080;
    private const THUMB_WIDTH = 480;
    private const THUMB_HEIGHT = 320;
    private const JPEG_QUALITY = 82;
    private const THUMB_QUALITY = 70;
    private const MAX_FILE_SIZE = 5120; // 5 MB

    public function index()
    {
        $media = Media::orderBy('created_at', 'desc')->paginate(20);

        return response()->json($media);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => [
                'required',
                'file',
                'max:'.self::MAX_FILE_SIZE,
                'mimes:jpeg,jpg,png,webp,gif,svg',
            ],
        ]);

        $file = $request->file('file');
        $extension = strtolower($file->getClientOriginalExtension());
        $baseName = Str::uuid();
        $isImage = in_array($file->getMimeType(), [
            'image/jpeg', 'image/png', 'image/webp', 'image/gif',
        ]);

        // For raster images: resize + compress + thumbnail
        if ($isImage) {
            return $this->storeProcessedImage($file, $baseName, $extension);
        }

        // For SVG or non-raster: store as-is
        return $this->storeRawFile($file, $baseName, $extension);
    }

    public function destroy(Media $media)
    {
        Storage::disk($media->disk)->delete($media->path);
        if ($media->thumbnail_path) {
            Storage::disk($media->disk)->delete($media->thumbnail_path);
        }
        $media->delete();

        return response()->json(null, 204);
    }

    private function storeProcessedImage($file, string $baseName, string $extension)
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($file->getPathname());
        $width = $image->width();
        $height = $image->height();

        // Resize if exceeds max dimensions (maintain aspect ratio)
        if ($width > self::MAX_WIDTH || $height > self::MAX_HEIGHT) {
            $image->scaleDown(self::MAX_WIDTH, self::MAX_HEIGHT);
            $width = $image->width();
            $height = $image->height();
        }

        // Encode to WebP for best size/quality ratio, fallback to original format for GIFs
        $outputExt = ($extension === 'gif') ? 'gif' : 'webp';
        $fileName = $baseName.'.'.$outputExt;
        $thumbName = $baseName.'_thumb.'.$outputExt;

        if ($outputExt === 'webp') {
            $encoded = $image->toWebp(self::JPEG_QUALITY);
        } else {
            $encoded = $image->toGif();
        }

        $path = 'media/'.$fileName;
        Storage::disk('public')->put($path, (string) $encoded);

        // Generate thumbnail
        $thumb = $manager->read($file->getPathname());
        $thumb->scaleDown(self::THUMB_WIDTH, self::THUMB_HEIGHT);

        if ($outputExt === 'webp') {
            $thumbEncoded = $thumb->toWebp(self::THUMB_QUALITY);
        } else {
            $thumbEncoded = $thumb->toGif();
        }

        $thumbPath = 'media/thumbs/'.$thumbName;
        Storage::disk('public')->put($thumbPath, (string) $thumbEncoded);

        $media = Media::create([
            'name' => $file->getClientOriginalName(),
            'filename' => $fileName,
            'mime_type' => 'image/'.$outputExt,
            'size' => Storage::disk('public')->size($path),
            'path' => $path,
            'thumbnail_path' => $thumbPath,
            'width' => $width,
            'height' => $height,
            'disk' => 'public',
            'user_id' => Auth::id(),
        ]);

        return response()->json($media, 201);
    }

    private function storeRawFile($file, string $baseName, string $extension)
    {
        $fileName = $baseName.'.'.$extension;
        $path = $file->storeAs('media', $fileName, 'public');

        $media = Media::create([
            'name' => $file->getClientOriginalName(),
            'filename' => $fileName,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'path' => $path,
            'disk' => 'public',
            'user_id' => Auth::id(),
        ]);

        return response()->json($media, 201);
    }
}
