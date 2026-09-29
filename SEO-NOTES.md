# SEO deployment and Google setup

The seven public pages have unique titles and descriptions, canonical URLs, social previews, one descriptive H1 per page, and connected Organization/WebSite/WebPage structured data. Inner pages include breadcrumbs. Wattala has location markup matching the published Sunday and Tuesday timetable. Nugegoda is an enquiry page, not a verified branch. Ten large rendered images use compressed WebP copies; original files remain available.

## After publishing

1. Verify the `mmacolombo.com` domain in Google Search Console using the DNS record Google provides. No verification token has been invented or added.
2. Submit `https://mmacolombo.com/sitemap.xml`. Inspect the homepage and location pages and request indexing after deployment.
3. Run Google's Rich Results Test against the deployed pages. Check URL Inspection for Google's selected canonical and rendered content.
4. Verify Google Business Profiles for real, eligible training locations. Keep the business name, phone, full postal address and opening hours consistent with the website. Confirm complete street addresses before adding them to location structured data; do not create a Nugegoda branch listing from the enquiry page.
5. Run PageSpeed Insights on mobile after publishing. Local image compression does not establish a measured Core Web Vitals score; advertising and external fonts/scripts can affect real performance.
6. Monitor Search Console indexing, queries, clicks and Core Web Vitals. Update visible schedules and structured data together whenever class times change. Change sitemap lastmod only when a page materially changes.

These changes are local until deployed. Search Console submission, Google Business Profile verification, live rich-result validation and ranking measurements require the deployed site and account access. Ranking and rich-result display are not guaranteed.

References: [Google Search guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [local business markup](https://developers.google.com/search/docs/appearance/structured-data/local-business).
