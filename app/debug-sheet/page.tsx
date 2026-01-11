import { fetchListingsFromSheet } from '@/lib/googleSheets';

export default async function DebugSheetPage() {
  const listings = await fetchListingsFromSheet();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Google Sheet Debug Info</h1>

      <div className="space-y-8">
        {listings.map((listing, idx) => (
          <div key={listing.id} className="border p-6 rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">
              Row {idx + 2}: {listing.title}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>ID:</strong> {listing.id}
              </div>
              <div>
                <strong>Slug:</strong> {listing.slug}
              </div>
              <div>
                <strong>County:</strong> {listing.county}
              </div>
              <div>
                <strong>State:</strong> {listing.state}
              </div>
              <div className="col-span-2">
                <strong>YouTube URL:</strong>{' '}
                {listing.youtubeUrl ? (
                  <span className="text-green-600">{listing.youtubeUrl}</span>
                ) : (
                  <span className="text-red-600">EMPTY/UNDEFINED</span>
                )}
              </div>
              <div className="col-span-2">
                <strong>Map Embed:</strong>{' '}
                {listing.mapEmbedHtml ? (
                  <span className="text-green-600">{listing.mapEmbedHtml.substring(0, 100)}...</span>
                ) : (
                  <span className="text-red-600">EMPTY/UNDEFINED</span>
                )}
              </div>
              <div className="col-span-2">
                <strong>Road Frontage:</strong>{' '}
                {listing.roadFrontage || <span className="text-gray-400">empty</span>}
              </div>
              <div className="col-span-2">
                <strong>Utilities:</strong>{' '}
                {listing.utilities || <span className="text-gray-400">empty</span>}
              </div>
              <div className="col-span-2">
                <strong>Parcel ID:</strong>{' '}
                {listing.parcelId || <span className="text-gray-400">empty</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold mb-2">Column Headers Expected:</h3>
        <ul className="list-disc list-inside text-sm">
          <li>Column P: <code className="bg-gray-100 px-2 py-1">YouTube URL</code> (exact match required)</li>
          <li>Column Q: <code className="bg-gray-100 px-2 py-1">Google Maps Embed</code> (exact match required)</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">
          If you see &quot;EMPTY/UNDEFINED&quot; above but you have data in your sheet, your column headers likely don&apos;t match exactly.
        </p>
      </div>
    </div>
  );
}
