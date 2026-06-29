# How to Add Your Real Photos

Right now the site uses placeholder photos from Unsplash. Here is exactly how to
replace them with real John Dewey photos.

## The simple method

1. Put your photo in the `images/` folder, e.g. `images/hero.jpg`.
2. Open the HTML file listed below in a text editor (Notepad, VS Code).
3. Find the long `https://images.unsplash.com/...` web address inside `src="..."`.
4. Replace that whole web address with your file path, e.g. `images/hero.jpg`.
5. Save. Done.

Tip: use "Find and Replace" (Ctrl+H) in your editor to swap a URL everywhere at once.

## Recommended photo sizes
- Hero / large banner photos: about 1100px wide
- Program & activity cards: about 600px wide
- Gallery thumbnails: about 400-600px wide
- Keep each file under ~300KB so pages load fast (use https://tinypng.com to shrink)

## Where each photo appears

### index.html (home page)
- Big "about" photo next to "A foundation for lifelong learning"
- 3 program cards: Kindergarten, School, Plus 2

### about.html
- Campus / community photo
- Principal photo

### teams.html
- Principal photo

### kindergarten.html
- Kindergarten classroom photo

### school.html
- School activities photo

### plus2.html
- Management students photo
- Humanities students photo

### facilities.html (6 photos)
- Library, Science Lab, Computer Lab, Sports Ground, Cafeteria, Transport

### cocurricular.html
- 9 activity thumbnails (Sports, Arts, Music, Drama, Science, Debate, Environment, Literary, Field Trips)

### Each activity page (sports, arts, music, drama, science, debate, environment, reading, excursions)
- 8 gallery photos each (the "Recent Highlights" grid)

### events.html
- One photo per event card

### gallery.html
- 16 photos (the main gallery)

### scrapbook.html
- Default cards. You can also upload student work directly in the Staff Portal
  (Scrapbook tab), which is easier than editing the file.

## The logo
The school logo is already added (logo.png, logo-mark.png, logo-white.png,
logo-mark-white.png). No action needed. To change it later, replace these files
keeping the same names.

## Easiest option for ongoing photos
For Gallery and Scrapbook, you do not need to edit any files at all - just use
the Staff Portal at /admin.html. The Gallery tab lets you upload images directly,
and the Scrapbook tab lets you upload student work and cover images. Those appear
on the site automatically (on the device where you add them; use Export to share).
