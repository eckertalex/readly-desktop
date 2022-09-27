#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{path::Path, fs::File, io::Write};
use epub::doc::EpubDoc;
use serde::Serialize;

#[derive(Serialize)]
struct Ebook {
  title: Option<String>,
  author: Option<String>,
  file_name: String,
  cover_file_name: String,
  // return cover_data directly and render with JS
  // did not work so far :( showed empty picture
  // cover_data: Vec<u8>,
}


#[tauri::command]
fn list_epubs(path: String) -> Vec<Ebook> {
  let dir = Path::new(&path);
  let mut epubs: Vec<Ebook> = Vec::new();
  if dir.is_dir() {
    for element in dir.read_dir().unwrap() {
      let epath = element.unwrap().path();
      if let Some(extension) = epath.extension() {
        if extension == "epub" {
          let mut ebook = EpubDoc::new(epath.clone()).expect("Couldn't open the epub");
          let title = ebook.mdata("title");
          let author = ebook.mdata("creator");
          let file_name: String = epath.clone().file_name().unwrap().to_string_lossy().into();
          let cover_data = ebook.get_cover().unwrap_or_default();

          // Check if exists, if so skip
          // collect them in a cover folder?
          let cover_file_name = file_name.to_owned() + ".png";
          let file = File::create(path.to_owned() + &cover_file_name);
          let mut file = file.unwrap();
          file.write_all(&cover_data).unwrap();

          epubs.push(Ebook {title, author, file_name, cover_file_name});
        }
      }
    }
  }
  epubs.into()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![list_epubs])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
