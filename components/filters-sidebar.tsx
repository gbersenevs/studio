type FiltersSidebarProps = {
  city?: string;
  type?: string;
  priceMin?: number;
  priceMax?: number;
  district?: string;
  livingRoom?: "with" | "without";
  amenities: string[];
  sort?: string;
  districts: string[];
  amenitiesOptions: string[];
};

export function FiltersSidebar({
  city,
  type,
  priceMin,
  priceMax,
  district,
  livingRoom,
  amenities,
  sort,
  districts,
  amenitiesOptions,
}: FiltersSidebarProps) {
  return (
    <form
      className="space-y-6 rounded-2xl border border-border/70 bg-white p-5 shadow-soft"
      method="get"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-text">Filters</h3>
        <a
          href="/listings"
          className="text-sm text-primary hover:underline"
        >
          Reset
        </a>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-text">City</label>
        <select
          name="city"
          defaultValue={city || "all"}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
        >
          <option value="all">All</option>
          <option value="Riga">Riga</option>
          <option value="Palanga">Palanga</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-text">Type</label>
        <select
          name="type"
          defaultValue={type || "all"}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary capitalize"
        >
          <option value="all">All</option>
          <option value="room">Room</option>
          <option value="apartment">Apartment</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text">Price per month (€)</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="priceMin"
            defaultValue={priceMin ?? ""}
            placeholder="Min"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            name="priceMax"
            defaultValue={priceMax ?? ""}
            placeholder="Max"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-text">District</label>
        <select
          name="district"
          defaultValue={district || "all"}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
        >
          <option value="all">All</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text">Living room</p>
        <div className="flex flex-col gap-2 text-sm">
          {[
            { value: "any", label: "Any" },
            { value: "with", label: "With living room" },
            { value: "without", label: "No living room" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="livingRoom"
                value={option.value}
                defaultChecked={
                  (!livingRoom && option.value === "any") ||
                  (livingRoom === "with" && option.value === "with") ||
                  (livingRoom === "without" && option.value === "without")
                }
                className="text-primary"
              />
              <span className="text-text-muted">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text">Amenities</p>
        <div className="grid grid-cols-1 gap-2 text-sm">
          {amenitiesOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                defaultChecked={amenities.includes(amenity)}
                className="text-primary"
              />
              <span className="text-text-muted">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-text">Sort by</label>
        <select
          name="sort"
          defaultValue={sort || "newest"}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
      >
        Apply filters
      </button>
    </form>
  );
}
