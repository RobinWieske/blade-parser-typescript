import { AbstractNode, DirectiveNode } from '../../nodes/nodes.js';
import { NodeCompiler } from '../nodeCompiler.js';

export class IncludeWhenCompiler implements NodeCompiler {
    compile(node: AbstractNode): string {
        const directive = node as DirectiveNode;

        return '<?php echo $__env->renderWhen(' + directive.getInnerContent() + ', \\Illuminate\\Support\\Arr::except(get_defined_vars(), [\'__data\', \'__path\'])); ?>';
    }
}