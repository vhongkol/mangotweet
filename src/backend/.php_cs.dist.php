<?php

/**
 * Rules we follow are from PSR-12 standards.
 *
 * - https://cs.symfony.com/doc/ruleSets/PSR12.html
 *
 * If something isn't addressed in either of those, some other common community rules are
 * used that might not be addressed explicitly by PSR-12 in order to improve 
 * code quality (so that devs don't need to comment on them in Code Reviews).
 *
 * For instance: removing trailing white space, removing extra line breaks where
 * they're not needed (back to back, beginning or end of function/class, etc.),
 * adding trailing commas in the last line of an array, etc.
 */

$finder = PhpCsFixer\Finder::create()
    ->exclude('node_modules')
    ->exclude('vendor')
    ->exclude('bootstrap')
    ->exclude('storage')
    ->in(__DIR__);

return (new PhpCsFixer\Config())->setRules([
        '@PSR12' => true,
        'new_with_braces' => [
            'anonymous_class' => false,
            'named_class' => true
        ],
        'yoda_style' => [
            'always_move_variable' => true,
            'equal' => true,
            'less_and_greater' => null,
        ],
        'multiline_whitespace_before_semicolons' => [
            'strategy' => 'no_multi_line',
        ],
        'concat_space' => [ 'spacing' => 'one' ],
        'ordered_imports' =>  [
            'sort_algorithm' => 'length',
        ],
    ])
    ->setFinder($finder);
