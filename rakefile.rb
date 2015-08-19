task :deploy do
    sh "git push origin gh-pages"
end

task :install_theme, [:theme_folder] do |t, args|
    src_path = args[:theme_folder]
    puts "Installing theme from #{src_path}"
end
