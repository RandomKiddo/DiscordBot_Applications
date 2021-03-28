/**
application.cs
Copyright 2021 RandomKiddo

This work is licensed under the Open Software License 3.0
As defined by this license, this work may be used commercially or privately,
modified, and distributed as specified by the license.
This license also comes with terms and conditions applied to it when,
dealing with modified and distributed derivative works.
For more information, see: https://opensource.org/licenses/OSL-3.0

The current maintainer of this work is RandomKiddo
This work only consists of source code files, written in:
python, javascript, typescript, go, java, c#
*/

using System;
using System.Linq;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using DSharpPlus;
using DSharpPlus.CommandsNext;
using DSharpPlus.Interactivity;
using Microsoft.Extensions.Configuration;

internal class Program {
    private CancellationTokenSource _cts { get; set; }
    private IConfigurationRoot _config;
    private DiscordClient _discord;
    private CommandsNextModule _commands;
    private InteractivityModule _interactivity;
    static async Task Main(string[] args) => await new Program().InitBot(args);
    async Task InitBot(string[] args) {
        try {
            _cts = new CancellationTokenSource();
            _config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("config.json", optional: false, reloadOnChange: true)
                .Build();
            _discord = new DiscordClient(new DiscordConfiguration {
                Token = _config.GetValue<string>("discord:token"),
                TokenType = TokenType.Bot
            });
            _interactivity = _discord.UseInteractivity(new InteractivityConfiguration() {
                PaginationBehavior = TimeoutBehavior.Delete,
                PaginationTimeout = Timespan.FromSeconds(30),
                Timeout = TimeSpan.FromSeconds(30)
            });
            var deps = BuildDeps();
            _commands = _discord.UseCommandsNext(new CommandsNextConfiguration {
                StringPrefix = _config.GetValue<string>("discord:CommandPrefix").
                    Dependencies = deps
            });
            RunAsyc(args).Wait();
        } catch (Exception err) {
            Console.Error.WriteLine(err.ToString());
        }
    }
    async Task RunAsync(string[] args) {
        await _discord.ConnectAsync();
        while (!_cts.IsCancelleationRequested) {
            await Task.Delay(Timespan.FromMinutes(1));
        }
    }
    private DependencyCollection BuildDeps() {
        using var deps = new DependencyCollectionBuilder();
        deps.AddInstance(_interactivity)
            .AddInstance(_cts)
            .AddInstance(_config)
            .AddInstance(_discord);
        return deps.Build();
    }
}