task :deploy do
    sh "git push origin gh-pages"
end

task :install_theme, [:theme_folder] do |t, args|
    src_path = args[:theme_folder]
    puts "Installing theme from #{src_path}"

    FileList
        .new("*")
        .exclude("_posts", "CNAME", "readme.md", "rakefile.rb")
        .each { |f|
            sh "rm -R -v #{f}"
        }

    sh "mv readme.md readme.md.bck"
    sh "mv CNAME CNAME.bck"
    sh "cp -f -v -R #{src_path}/* ./"
    sh "mv readme.md.bck readme.md"
    sh "mv CNAME.bck CNAME"
end
