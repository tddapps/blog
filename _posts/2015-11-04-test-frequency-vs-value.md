There are many different ways of testing the code. Some companies have a QA team that manually verifies the functionality while others have automated test suites. Other places have a hybrid of QA and automated test suites. Moreover, there are companies with no formal testing procedure, and others that test their parts of their code in production. 

As a general rule tests should run as often as possible. They reduce the developers' feedback loop. It is easier to remember what changed one minute ago than four days ago. The following is my **Execution Frequency** vs. **Value** table. It should provide some guidelines on what direction to take while scheduling test runs.

Execution Frequency                    | Value
-------------------------------------- | ------------------------------
Manual Test Run                        | 💰
Automated Test Manual Run              | 💰💰
Automated Test Weekly Run              | 💰💰💰
Automated Test Daily Run               | 💰💰💰💰💰💰💰💰💰💰
Automated Test Run Multiple Daily Runs | 💰💰💰💰💰💰💰💰💰💰💰💰
Automated Test Run on Commit           | 💰💰💰💰💰💰💰💰💰💰💰💰💰

Aim to get as much value as possible out of the tests. Every effort in test automation will easily pay off with saved costs in productivity.

Manual processes are unreliable and error prone. Aim to reduce them as much as possible. While every manual test run has a clear cost associated with it, automated test runs cost close to nothing. Companies with QA teams always make a big deal about [regression tests](https://en.wikipedia.org/wiki/Regression_testing) because how costly they are. On the other hand, every automated test run is a regression test.

Not all the tests need to run with the same frequency. While it is relatively easy to configure unit tests to run for every commit it may be very difficult and costly to run seven hours worth of automated UI tests for every commit. However, it is much better to run the seven hours worth of automated UI tests overnight than once every week.

Some Api integration tests may need to be run on a regular schedule to guarantee the stability of the system and catch errors early. As usual reducing the feedback loop is fundamental. It is definitely better to alert your partner of a breaking change the day they introduced it than two weeks after in a hurry before a release. Always try to have these integration tests running as often as possible.

##Summary
Automate manual processes. Run automated tests as often as possible.
